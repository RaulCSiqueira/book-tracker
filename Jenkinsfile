pipeline {
  agent any
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/RaulCSiqueira/book-tracker.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run start'
        sh 'npm run build'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'nodejs --version'
      }
    }
  }
}
