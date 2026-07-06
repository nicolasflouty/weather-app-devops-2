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

        stage('Build & Push Image to Docker Hub') {
            steps {
                sh '''
                echo nicolas1212 | docker login -u nicolasflouty --password-stdin

                docker tag weather-app nicolasflouty/weather-app:latest
                docker push nicolasflouty/weather-app:latest
                '''
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh '''
                ssh -i /var/jenkins_home/nicolas.pem -o StrictHostKeyChecking=no ubuntu@54.93.203.148 "
                    docker pull nicolasflouty/weather-app:latest &&
                    docker stop weather-app || true &&
                    docker rm weather-app || true &&
                    docker run -d -p 3000:3000 --name weather-app nicolasflouty/weather-app:latest
                "
                '''
            }
        }
    }
}
