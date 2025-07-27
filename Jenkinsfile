pipeline {
    agent any

    environment {
        PROJECT_DIR = "${env.WORKSPACE}/webapp-frontend"
        REPO_URL = 'https://github.com/DeepakSingh916/webapp-frontend.git'
    }

    stages {
        stage('Clone Repo') {
            steps {
                sh "rm -rf $PROJECT_DIR"
                sh "git clone $REPO_URL $PROJECT_DIR"
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("$PROJECT_DIR") {
                    sh 'npm install'
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
                    sh "nohup serve -s build -l tcp://0.0.0.0:3000 > serve.log 2>&1 &"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Frontend deployed successfully!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
