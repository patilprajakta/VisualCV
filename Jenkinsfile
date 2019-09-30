pipeline {
  agent any
    tools{
    nodejs 'node js'
         }
  stages {
    stage ('Clone') {
      steps {
        checkout scm
        }
      }
	stage ('SonarQube Analysis') {
		steps {
			build job: 'visual-cv-frontend-sonarqube', propagate: false
		}
	}	  
  stage ('Dependencies') { 
    steps {
      sh 'npm install'
        }
    }
    stage ('Build') { 
    steps {
      sh 'npm run build'
        }
    }
    stage('ArchiveArtifact'){
      steps{
        sh 'ls'          
        sh 'zip -r dist.zip dist'
        archiveArtifacts 'dist.zip'
      }
    }
     stage('Post Build Action'){
      steps{
        build job: 'visual-cv-backend', propagate: false
      }
    } 
  }
}