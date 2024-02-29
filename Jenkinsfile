pipeline {
    agent any  // Uses any available agent

    tools {
        // Explicitly defines Node.js version (replace "16.19.0" with desired version)
        nodejs "node"
    }
node {
    def SONARQUBE_HOSTNAME = 'sonarqube'

    def GRADLE_HOME = tool name: 'gradle-4.10.2', type: 'hudson.plugins.gradle.GradleInstallation'
    sh "${GRADLE_HOME}/bin/gradle tasks"

    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'  // Installs dependencies from package.json
            }
        }
    stage('sonar-scanner') {
      def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
      withCredentials([string(credentialsId: 'sonar', variable: 'sonarLogin')]) {
        sh "${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://${SONARQUBE_HOSTNAME}:9000 -Dsonar.login=${sonarLogin} -Dsonar.projectName=WebApp -Dsonar.projectVersion=${env.BUILD_NUMBER} -Dsonar.projectKey=GS -Dsonar.sources=src/main/ -Dsonar.tests=src/test/ -Dsonar.java.binaries=build/**/* -Dsonar.language=java"
      }
    }
        // Add additional stages for your specific workflow (e.g., build, test, deploy)
        // Replace "Example" with meaningful stage names and relevant steps within each stage.
        stage('Example') {
            steps {
                sh 'npm config ls'  // Example command (replace with your desired task)
            }
        }
    }
}
