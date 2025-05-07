pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = "192.241.148.118:5000"
        IMAGE_NAME = "backend_dog"
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
                sh 'npm test || true' // Temporal hasta que agregues tests
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("http://${DOCKER_REGISTRY}", 'docker-registry-credentials') {
                        docker.image("${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
        
        stage('Deploy to QA') {
            steps {
                sh 'docker-compose -f /dog_project/docker-compose-qa.yml up -d --scale backend=3 --scale frontend=3'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker-compose -f /dog_project/docker-compose-prod.yml up -d --scale backend=2 --scale frontend=2'
            }
        }
    }
}

