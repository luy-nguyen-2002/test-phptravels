pipeline {
  agent any

  environment {
    CI = "true"
    HEADLESS = "true"
  }

  options {
    timeout(time: 90, unit: 'MINUTES')
    timestamps()
  }

  stages {

    stage('Checkout') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            git branch: 'main', url: 'https://github.com/luy-nguyen-2002/test-phptravels.git'
          }
        }
      }
    }

    stage('Setup Node.js') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'node -v || echo Node not installed'
            bat 'npm -v || echo npm not installed'
          }
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npm ci'
          }
        }
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright install --with-deps'
          }
        }
      }
    }

    stage('Load Environment (.env.example)') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            if (fileExists('.env.example')) {
              echo 'Loading environment variables from .env.example'
              def lines = readFile('.env.example').split('\n')
              def envList = []
              for (line in lines) {
                if (!line.trim().startsWith('#') && line.contains('=')) {
                  def parts = line.split('=')
                  def key = parts[0].trim()
                  def value = parts.length > 1 ? parts[1].trim().replaceAll('"', '') : ''
                  envList << "${key}=${value}"
                }
              }
              withEnv(envList) {
                echo "Environment variables loaded"
              }
            } else {
              echo '⚠️ No .env.example file found'
            }
          }
        }
      }
    }


    stage('Generate BDD Tests (bddgen)') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx bddgen'
          }
        }
      }
    }

    // ---------- Priority Tests ----------
    stage('Priority Tests - Google Chrome') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Google Chrome" --grep "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Priority Tests - Microsoft Edge') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Microsoft Edge" --grep "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Priority Tests - Apple Safari') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Apple Safari" --grep "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Priority Tests - Mozilla Firefox') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Mozilla Firefox" --grep "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Priority Tests - Samsung Internet (Android)') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Samsung Internet (Android)" --grep "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Priority Tests - Opera / Brave (Chromium)') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Opera / Brave (Chromium)" --grep "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    // ---------- Remaining Tests ----------
    stage('Remaining Tests - Google Chrome') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Google Chrome" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Remaining Tests - Microsoft Edge') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Microsoft Edge" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Remaining Tests - Apple Safari') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Apple Safari" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Remaining Tests - Mozilla Firefox') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Mozilla Firefox" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Remaining Tests - Samsung Internet (Android)') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Samsung Internet (Android)" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    stage('Remaining Tests - Opera / Brave (Chromium)') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx playwright test --project="Opera / Brave (Chromium)" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright'
          }
        }
      }
    }

    // ---------- Reporting ----------
    stage('Generate Allure Report') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            bat 'npx allure generate ./allure-results --clean -o allure-report'
          }
        }
      }
    }
  }

  post {
    always {
      script {
        // If any stage failed, mark build as UNSTABLE
        if (currentBuild.resultIsWorseOrEqualTo('FAILURE')) {
          currentBuild.result = 'UNSTABLE'
        }
      }

      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'test-results/**, traces/**, videos/**', allowEmptyArchive: true
    }
    unstable {
      echo '⚠️ Build completed with some failed stages (UNSTABLE). Check test reports.'
    }
    failure {
      echo '❌ Build failed! Check test reports and logs.'
    }
    success {
      echo '✅ All tests passed successfully!'
    }
  }
}
