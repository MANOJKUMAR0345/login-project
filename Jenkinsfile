pipeline {
 agent any
 stages {
  stage('Install Backend') { steps { sh 'cd backend && npm install' } }
  stage('Run Backend') { steps { sh 'cd backend && nohup npm start &' } }
 }
}