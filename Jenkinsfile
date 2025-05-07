pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/AnaLucia134/backend_dog.git'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t 192.241.148.118:5000/backend-dog:latest .'
            }
        }

        stage('Push') {
            steps {
                sh 'docker push 192.241.148.118:5000/backend-dog:latest'
            }
        }

        stage('Deploy QA') {
            when {
                branch 'develop'
            }
            steps {
                sh 'docker-compose -f /op/dog_project/docker-compose-qa.yml up -d'
            }
        }

        stage('Deploy Prod') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker-compose -f /op/dog_project/docker-compose-prod.yml up -d'
            }
        }
    }
}
