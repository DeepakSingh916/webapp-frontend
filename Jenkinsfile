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
                // Kill all node processes (serve runs under node)
                // Ignore error if no such process
                bat 'taskkill /F /IM node.exe || exit /b 0'
            }
        }

        stage('Serve Locally') {
            steps {
                echo 'Starting React app on localhost:3000...'
                bat 'start /b npx serve -s build -l 3000'
            }
        }
    }
}
