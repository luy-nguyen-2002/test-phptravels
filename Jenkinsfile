// ======================================================
// ---------- PIPELINE ----------
// ======================================================

pipeline {
  agent any

  environment {
    BASE_URL= "https://phptravels.net/"
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
          catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
            git branch : 'main',
            url: 'https://github.com/luy-nguyen-2002/test-phptravels.git'
          }
        }
      }
    }

    stage('Setup Node.js') {
      steps {
        script {
          catchError(buildResult : 'UNSTABLE', stageResult : 'FAILURE') {
            bat 'node -v || echo Node not installed' bat 'npm -v || echo npm not installed'
          }
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        catchError(buildResult : 'UNSTABLE', stageResult : 'FAILURE') {
          bat 'npm ci'
        }
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        catchError(buildResult : 'UNSTABLE', stageResult : 'FAILURE') {
          bat 'npx playwright install --with-deps'
        }
      }
    }

    // stage('Load .env.example') {
    //   steps {
    //     script {
    //       catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
    //         if (fileExists('.env.example')) {
    //           echo 'Loading environment variables from .env.example'
    //           def envLines = readFile('.env.example').split('\n')
    //           def envList = []

    //           for (line in envLines) {
    //             if (!line.trim().startsWith('#') && line.contains('=')) {
    //               def (key, value) = line.split('=', 2)
    //               envList << "${key.trim()}=${value.trim().replaceAll('\"', '')}"
    //             }
    //           }

    //           withEnv(envList) {
    //             echo '✅ Environment variables loaded.'
    //           }
    //         } else {
    //           echo '⚠️ No .env.example found. Proceeding with defaults.'
    //         }
    //       }
    //     }
    //   }
    // }

    stage('Generate BDD Tests (bddgen)') {
      steps {
        catchError(buildResult : 'UNSTABLE', stageResult : 'FAILURE') {
          bat 'npx bddgen'
        }
      }
    }

     // -----------------------------------------------
    // Run Priority Tests in Parallel
    // -----------------------------------------------
    stage('Priority Tests') {
      steps {
        script {
          def browsers = [
            'Google Chrome',
            'Microsoft Edge',
            'Apple Safari',
            'Mozilla Firefox',
            'Samsung Internet (Android)',
            'Opera / Brave (Chromium)'
          ]

          def parallelStages = browsers.collectEntries { browser ->
            ["${browser}" : {
              catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                bat """
                  echo Running Playwright Priority tests for ${browser}
                  npx playwright test --project="${browser}" --grep "@smoke|@positive" --reporter=list,html,allure-playwright --output=allure-results\\${browser.replace(' ', '_')}
                """
              }
            }]
          }

          parallel parallelStages
        }
      }
    }

    // -----------------------------------------------
    // Run Remaining Tests in Parallel
    // -----------------------------------------------
    stage('Remaining Tests') {
      steps {
        script {
          def browsers = [
            'Google Chrome',
            'Microsoft Edge',
            'Apple Safari',
            'Mozilla Firefox',
            'Samsung Internet (Android)',
            'Opera / Brave (Chromium)'
          ]

          def parallelStages = browsers.collectEntries { browser ->
            ["${browser}" : {
              catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                bat """
                  echo Running Remaining Playwright tests for ${browser}
                  npx playwright test --project="${browser}" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright --output=allure-results\\${browser.replace(' ', '_')}
                """
              }
            }]
          }

          parallel parallelStages
        }
      }
    }

  }

  post {
    always {
      script {
        
        echo "📄 Generating Allure HTML report from all browser results"
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          // Generate report from multiple directories (one per browser)
          bat 'npx allure generate "allure-results" --clean -o allure-report'
        }

        if (currentBuild.resultIsWorseOrEqualTo('FAILURE')) {
          currentBuild.result = 'UNSTABLE'
          echo '⚠️ Some stages failed — marking build as UNSTABLE.'
        }
      }

      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'test-results/**, traces/**, videos/**', allowEmptyArchive: true
    }

    unstable {
      echo '⚠️ Build completed with failed stages — check test reports for details.'
    }
    
    failure{
      echo '❌ Pipeline failed completely — check logs and reports.'
    }
    
    success {
      echo '✅ All stages passed successfully!'
    }
  }
}
