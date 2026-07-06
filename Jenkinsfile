pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/nicolasflouty/weather-app-devops-2.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t weather-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop weather-app || true
                docker rm weather-app || true
                docker run -d -p 3000:3000 --name weather-app weather-app
                '''
            }
        }
    }
}
