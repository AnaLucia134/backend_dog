pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = "192.241.148.118:5000"
        IMAGE_NAME = "backend-dog"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/AnaLucia134/backend_dog.git'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t ${IMAGE_NAME} .'
                sh 'docker tag ${IMAGE_NAME} ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest'
            }
        }
        
        stage('Push') {
            steps {
                // Asegurar que el registry esté corriendo
                sh 'docker start registry || true'
                // Forzar push HTTP
                sh 'docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest'
            }
        }
        
        stage('Deploy QA') {
            steps {
                script {
                    try {
                        sh '''
                            cd /opt/dog_project
                            docker-compose -f docker-compose-qa.yml down
                            docker-compose -f docker-compose-qa.yml up -d --scale backend=3
                        '''
                    } catch (err) {
                        echo "Error en despliegue QA: ${err}"
                    }
                }
            }
        }
        
        stage('Deploy Prod') {
            when {
                branch 'main'
            }
            steps {
                script {
                    try {
                        sh '''
                            cd /opt/dog_project
                            docker-compose -f docker-compose-prod.yml down
                            docker-compose -f docker-compose-prod.yml up -d --scale backend=2
                        '''
                    } catch (err) {
                        echo "Error en despliegue Prod: ${err}"
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completado - limpiando'
            sh 'docker system prune -f || true'
        }
        failure {
            echo 'Pipeline falló - revisar logs'
        }
        success {
            echo 'Pipeline exitoso'
        }
    }
}
