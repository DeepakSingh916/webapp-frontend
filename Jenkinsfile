pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/DeepakSingh916/webapp-frontend'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Cleanup Previous Serve') {
            steps {
                echo 'Killing previous serve processes if any...'
                bat 'taskkill /F /IM node.exe || exit /b 0'
            }
        }

        stage('Serve Locally') {
            steps {
                echo 'Starting React app in background...'
                powershell '''
                    $command = 'cmd.exe'
                    $args = '/c start "serve" cmd /c "npx serve -s build -l 3000 > serve.log 2>&1"'
                    Start-Process -FilePath $command -ArgumentList $args
                '''
            }
        }

        stage('Check Serve') {
            steps {
                echo 'Checking if React app is running...'
                bat 'curl http://localhost:3000 || exit /b 1'
            }
        }
    }
}
