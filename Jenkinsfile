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
            bat 'npx playwright install --with-deps || echo Skipped (Windows)'
          }
        }
      }
    }

    stage('Load Environment (.env.example)') {
      steps {
        script {
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            if (fileExists('.env.example')) {
              echo '✅ Found .env.example — loading variables'
              // Copy to actual .env for dotenv compatibility
              bat 'copy .env.example .env'

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
                echo "🌍 Environment variables loaded into Jenkins runtime"
              }
            } else {
              echo '⚠️ No .env.example found. Proceeding with defaults.'
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
    def browsers = [
      "Google Chrome",
      "Microsoft Edge",
      "Apple Safari",
      "Mozilla Firefox",
      "Samsung Internet (Android)",
      "Opera / Brave (Chromium)"
    ]

    stages {
      // Priority group
      browsers.each { browser ->
        stage("Priority Tests - ${browser}") {
          steps {
            script {
              catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                bat "npx playwright test --project=\"${browser}\" --grep \"@smoke|@positive\" --reporter=list,html,allure-playwright"
              }
            }
          }
        }
      }

      // Remaining group
      browsers.each { browser ->
        stage("Remaining Tests - ${browser}") {
          steps {
            script {
              catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                bat "npx playwright test --project=\"${browser}\" --grep-invert \"@smoke|@positive\" --reporter=list,html,allure-playwright"
              }
            }
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
        echo "📦 Archiving reports..."
        archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        archiveArtifacts artifacts: 'test-results/**, traces/**, videos/**', allowEmptyArchive: true

        // ✅ Mark build UNSTABLE if any stage failed
        if (currentBuild.rawBuild.getActions(hudson.model.ErrorAction).size() > 0) {
          currentBuild.result = 'UNSTABLE'
          echo '⚠️ Some stages failed — marking build as UNSTABLE.'
        }
      }
    }

    unstable {
      echo '⚠️ Build completed with failed stages — check test reports for details.'
    }
    unstable {
      echo '⚠️ Build completed with some failed stages (UNSTABLE). Check test reports.'
    }
    failure {
      echo '❌ Pipeline failed completely — investigate logs.'
    }
    success {
      echo '✅ All stages passed successfully!'
    }
  }
}
