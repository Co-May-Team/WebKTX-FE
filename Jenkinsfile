pipeline {
	agent any
    stages {
		stage ('Load functions') {      // Define the function files will be used
            steps {
                script {
                    emailFunction = load "Email/emailFunction.groovy"
                }
            }
        }
        stage('Build') { 
            steps {
                sh 'npm install --force' 
				sh 'npm run build' 
            }
        }
		stage('Deploy') { 
            steps {
				sh 'sudo systemctl enable webKTX-FE.service'
				sh 'sudo systemctl stop webKTX-FE'
				sh 'sudo systemctl start webKTX-FE'
				sh 'sudo systemctl status webKTX-FE'
            }
        }
    }
}