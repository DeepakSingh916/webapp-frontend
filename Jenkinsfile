pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/DeepakSingh916/webapp-frontend.git'
        PROJECT_DIR = '/home/ubuntu/webapp-frontend'
    }

    stages {
        stage('Clone Repo') {
            steps { 
                sh 'whoami'
                sh 'id'
                sh "sudo rm -rf $PROJECT_DIR"
                sh "sudo git clone $REPO_URL $PROJECT_DIR"
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("$PROJECT_DIR") {
                    sh '''
                    set -x
                    npm install || (echo "npm install failed with exit code $?" && exit 1)
                    '''
                }
            }
        }

        stage('Build App') {
            steps {
                dir("$PROJECT_DIR") {
                    sh 'npm run build'
                }
            }
        }

        stage('Serve App') {
            steps {
                dir("$PROJECT_DIR") {
                    sh "fuser -k 3000/tcp || true"
                    sh "npm install -g serve || true"
                    sh "nohup serve -s build -l 3000 > serve.log 2>&1 &"
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend deployed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
