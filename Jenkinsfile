// ======================================================
// ---------- SHARED FUNCTIONS ----------
// ======================================================

// def runPlaywright(tags, project) {
//   catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
//     bat """
//       echo Running Playwright tests for ${project} with tags: ${tags}
//       npx playwright test --project="${project}" --grep "${tags}" --reporter=list,html,allure-playwright
//     """
//   }
// }

// def runPlaywrightInvert(tags, project) {
//   catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
//     bat """
//       echo Running remaining Playwright tests for ${project} (excluding ${tags})
//       npx playwright test --project="${project}" --grep-invert "${tags}" --reporter=list,html,allure-playwright
//     """
//   }
// }

// ======================================================
// ---------- PIPELINE ----------
// ======================================================

pipeline {
  agent any

  environment {
    BASE_URL=https://phptravels.net/
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
          catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
            git branch : 'main',
            url: 'https://github.com/luy-nguyen-2002/test-phptravels.git'
          }
        }
      }
    }

    stage('Setup Node.js') {
      steps {
        script {
          catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
            bat 'node -v || echo Node not installed' bat 'npm -v || echo npm not installed'
          }
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
          bat 'npm ci'
        }
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
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
        catchError(buildResult : 'SUCCESS', stageResult : 'FAILURE') {
          bat 'npx bddgen'
        }
      }
    }

     // ---------- PRIORITY TESTS ----------
    stage('Priority Tests') {
      parallel {
        stage('Chrome') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running Playwright tests for Google Chrome
                npx playwright test --project="Google Chrome" --grep "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Edge') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running Playwright tests for Microsoft Edge
                npx playwright test --project="Microsoft Edge" --grep "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Safari') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running Playwright tests for Apple Safari
                npx playwright test --project="Apple Safari" --grep "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Firefox') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running Playwright tests for Mozilla Firefox
                npx playwright test --project="Mozilla Firefox" --grep "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Samsung Internet') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running Playwright tests for Samsung Internet (Android)
                npx playwright test --project="Samsung Internet (Android)" --grep "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Opera / Brave') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running Playwright tests for Opera / Brave (Chromium)
                npx playwright test --project="Opera / Brave (Chromium)" --grep "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }
      }
    }

    // ---------- REMAINING TESTS ----------
    stage('Remaining Tests') {
      parallel {
        stage('Chrome') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running remaining Playwright tests for Google Chrome
                npx playwright test --project="Google Chrome" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Edge') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running remaining Playwright tests for Microsoft Edge
                npx playwright test --project="Microsoft Edge" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Safari') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running remaining Playwright tests for Apple Safari
                npx playwright test --project="Apple Safari" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Firefox') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running remaining Playwright tests for Mozilla Firefox
                npx playwright test --project="Mozilla Firefox" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Samsung Internet') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running remaining Playwright tests for Samsung Internet (Android)
                npx playwright test --project="Samsung Internet (Android)" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }

        stage('Opera / Brave') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              bat '''
                echo Running remaining Playwright tests for Opera / Brave (Chromium)
                npx playwright test --project="Opera / Brave (Chromium)" --grep-invert "@smoke|@positive" --reporter=list,html,allure-playwright
              '''
            }
          }
        }
      }
    }
  }

  post {
    always {
      script {
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
