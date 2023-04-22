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
                sh 'npm install --save --legacy-peer-deps' 
				sh 'npm run build' 
            }
        }
		stage('Deploy') { 
            steps {
				sh 'sudo systemctl enable dev-webKTX-FE.service'
				sh 'sudo systemctl stop dev-webKTX-FE'
				sh 'sudo systemctl start dev-webKTX-FE'
				sh 'sudo systemctl status dev-webKTX-FE'
            }
        }
    }
}