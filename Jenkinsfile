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
                bat '''
                    start "React Serve" cmd /c "npx serve -s build -l 3000 > serve.log 2>&1"
                '''
            }
        }

        stage('Wait for Server') {
            steps {
                echo 'Waiting for React app to start on port 3000...'
                bat '''
                    set RETRIES=10
                    set COUNT=0
                    :retry
                    curl http://localhost:3000 1>nul 2>&1
                    if %ERRORLEVEL% == 0 (
                        echo Server is up!
                    ) else (
                        set /a COUNT+=1
                        if %COUNT% GEQ %RETRIES% (
                            echo Server failed to start in time.
                            exit /b 1
                        )
                        timeout /T 2 >nul
                        goto retry
                    )
                '''
            }
        }

        stage('Dump Serve Log') {
            steps {
                echo 'Printing serve.log (optional)...'
                bat 'type serve.log'
            }
        }
    }
}
