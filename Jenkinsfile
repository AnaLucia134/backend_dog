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
                credentialsId: 'github-credentials' // Asegúrate de crear estas credenciales
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
                    def testResult = sh(script: 'npm test || true', returnStatus: true)
                    if (testResult != 0) {
                        unstable("Some tests failed or no tests found")
                    }
                }
            }
        }

        stage('Build & Push') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                script {
                    // Construir imagen
                    docker.build("${DOCKER_REGISTRY}/backend-dog:${env.BUILD_ID}")
                    
                    // Subir al registry
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
                    docker-compose -f docker-compose-qa.yml up -d --scale backend=3
                """
            }
        }
    }

    post {
        always {
            cleanWs()
            script {
                if (currentBuild.result == 'UNSTABLE') {
                    emailext (
                        subject: "Pipeline UNSTABLE: ${currentBuild.fullDisplayName}",
                        body: "Tests failed or no tests found. Check ${env.BUILD_URL}",
                        to: 'ana@example.com'
                    )
                }
            }
        }
    }
}
