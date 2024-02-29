pipeline {
    agent any


    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/RaulCSiqueira/book-tracker.git'
            }
        }

        stage('Client Side - Install Dependencies and Start Development Server') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run start &'
                    sleep 10 // Wait for the development server to start (adjust as needed)
                }
            }
        }

        stage('Client Side - Build Project') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Server Side - Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Server Side - Start Server') {
            steps {
                script {
                    sh 'npm run start &'
                    sleep 10 // Wait for the server to start (adjust as needed)
                }
            }
        }

        stage('Server Side - Start Server with Nodemon (Development)') {
            steps {
                script {
                    sh 'npm run start-dev &'
                    sleep 10 // Wait for the server to start (adjust as needed)
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'pkill -f "npm run start"'
                sh 'pkill -f "npm run start-dev"'
            }
            // Clean up processes when the pipeline finishes
        }

        success {
            echo 'Pipeline succeeded!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
