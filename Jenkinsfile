pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "192.241.148.118:5000"
        PROJECT_DIR = "/root/dog_project"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', 
                url: 'https://github.com/AnaLucia134/backend_dog.git',
                credentialsId: 'github-credentials'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install --save-dev jest supertest'
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (error) {
                        echo "Tests failed: ${error}"
                        // Opcional: marcar el build como inestable en lugar de fallido
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/backend-dog:${env.BUILD_ID}")
                }
            }
        }

        stage('Push to Registry') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                script {
                    docker.withRegistry("http://${DOCKER_REGISTRY}", 'docker-registry-credentials') {
                        docker.image("${DOCKER_REGISTRY}/backend-dog:${env.BUILD_ID}").push()
                        docker.image("${DOCKER_REGISTRY}/backend-dog:latest").push()
                    }
                }
            }
        }

        stage('Deploy to QA') {
            when {
                branch 'develop'
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                sh """
                    cd ${PROJECT_DIR}
                    docker-compose -f docker-compose-qa.yml down
                    docker-compose -f docker-compose-qa.yml up -d
                """
            }
        }
    }

    post {
        always {
            cleanWs()
            script {
                if (currentBuild.result == 'FAILURE') {
                    mail to: 'ana@example.com',
                         subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                         body: "Check console output at ${env.BUILD_URL}"
                }
            }
        }
        success {
            echo 'Pipeline completed successfully'
        }
    }
}
