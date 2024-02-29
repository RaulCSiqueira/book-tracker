pipeline {
    agent any
    
    environment {
        PATH = "/path/to/your/nodejs/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git
                git 'https://github.com/RaulCSiqueira/book-tracker.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests using your test framework (e.g., Mocha)
                script {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            // Archive test reports or any artifacts
            archiveArtifacts 'test-reports/**/*'
        }

        success {
            // Send a notification or trigger additional steps on success
            echo 'Tests passed successfully!'
        }

        failure {
            // Send a notification or trigger additional steps on failure
            echo 'Tests failed! Check the test reports.'
        }
    }
}
