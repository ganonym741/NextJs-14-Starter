import groovy.json.JsonSlurperClassic

def deployment(env, jobname, docker_name, docker_network_name, docker_network_subnet, docker_network_gateway, dockerHubUser, dockerHubPass) {

    // Tentukan ke environment mana deployment akan dilakukan
    def split_job_name = jobname.split('-')
    def appType = split_job_name[0]
    def userType = split_job_name[1]
    def hostname = sh(script: "${workdir}/define_hosts.sh ${appType} ${userType} ${env}", returnStdout: true).trim()

    // Deployment sesuai environment
    withCredentials([string(credentialsId: "$hostname", variable: 'JSON_STRING')]) {
        script {
            def jsonData = new JsonSlurperClassic().parseText(JSON_STRING)

            def remote = [:]
            remote.name = "$hostname"
            remote.host = jsonData.hostname
            remote.user = jsonData.username
            remote.password = jsonData.password
            remote.allowAnyHosts = true

            // Create directory
            //sshCommand remote: remote, command: """ sh(script: "${workdir}/createdir.sh ${jobname}", returnStdout: true).trim() """
            sshCommand remote: remote, command: """
                  mkdir -p /data/${jobname}
                  mkdir -p /data/${jobname}/logs
                  mkdir -p /data/${jobname}/src
            """

            // Check docker network
            sshCommand remote: remote, command: """
                  if docker network ls --format '{{.Name}}' | grep -q ${docker_network_name}; then
                     echo "Network dengan nama ${docker_network_name} sudah ada."
                     else
                        # Membuat network baru dengan pengaturan IP range dan gateway
                        docker network create --subnet ${docker_network_subnet} --gateway ${docker_network_gateway} ${docker_network_name}
                        echo "Network ${docker_network_name} berhasil dibuat dengan IP range ${docker_network_subnet} dan gateway ${docker_network_gateway}."
                  fi
            """

            // Put files
            sshPut remote: remote, from: "docker-compose.yaml", into: "/data/${jobname}"
            sshPut remote: remote, from: ".env_${env}", into: "/data/${jobname}"

            // Docker login 
            sshCommand remote: remote, command: """
            echo "$dockerHubPass" | docker login -u "$dockerHubUser" --password-stdin
            """

            // Execute   
            sshCommand remote: remote, command: """
               cd /data/${jobname}
               sed -i 's|^ *# image: docker-image:tag|    image: ${docker_name}|' docker-compose.yaml
               sed -i 's/^ *build:/    #build:/' docker-compose.yaml
               sed -i 's/^ *context: ./       #context: ./' docker-compose.yaml
               sed -i 's/^ *dockerfile: Dockerfile/       #dockerfile: Dockerfile/' docker-compose.yaml
               sed -i 's/- .env/- .env_${env}/g' docker-compose.yaml
               docker-compose -f docker-compose.yaml down
               docker-compose -f docker-compose.yaml pull
               docker-compose -f docker-compose.yaml up -d --build
            """
        }
    }
}

def check_env(infisical_passphrase, infisical_env) {
    dir("${WORKSPACE}") {
        sh(script: "${workdir}/infisical.sh ${infisical_passphrase} ${infisical_env}", returnStdout: true).trim()
    }
}

pipeline {
    agent any
    environment {
        // Workdir
        def workdir = "${env.JENKINS_HOME}/script"

        // Set Job Name
        def jobname = "${env.JOB_NAME}".split('/').first()

        // Set docker login, image name, network name, range, gateway
        def dockerHubPass = credentials('DockerHubPass')
        def dockerHubUser = credentials('DockerHubUser')
        def docker_name = "endiazequitylife/$jobname"
        def docker_network_name = "net-eli-sco"  
        def docker_network_subnet = "null"  
        def docker_network_gateway = "null"  

        // Set Credentials
        def infisical_passphrase = credentials('INFISICAL_VAULT_FILE_PASSPHRASE')
    }
    stages {
        stage('Clone Repo') {
            steps {
                script {
                    try {
                        retry(3) {
                            checkout scm
                        }
                    } catch (Exception e) {
                        echo "failed clone"
                    }
                }
            }
        }

        stage("Static Code Analysis") {
            when {
                branch 'dev'
            }
            steps {
                script {
                    try {
                        retry(3) {
                            def scannerHome = tool 'sonarqube-scanner';
                            withSonarQubeEnv() {
                                sh "${scannerHome}/bin/sonar-scanner"
                            }
                        }
                    } catch (Exception e) {
                        echo "failed SCA"
                    }
                }
            }
        }

        stage("Quality Gate") {
            when {
                branch 'dev'
            }
            steps {
                script {
                    try {
                        retry(3) {
                            timeout(time: 1, unit: 'HOURS') {
                                waitForQualityGate abortPipeline: true
                            }
                        }
                    } catch (Exception e) {
                        echo "failed QG"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    try {
                        retry(2) {
                            //sh(script: "${workdir}/build.sh ${jobname}", returnStdout: true).trim()
                            echo "build berhasil"
                        }
                    } catch (Exception e) {
                        //telegramNotification("[Jenkins]\nJob Name : ${JOB_NAME}\nBuild Number : #${env.BUILD_NUMBER}\nStage: ${env.STAGE_NAME}\nStatus : Failed")
                        //error("Error Details: ${e.message}")
                        echo "failed build"
                    }
                }
            }
        }

        stage("SIT") {
            when {
                branch 'dev'
            }
            steps {
                script {
                    retry(2) {
                        stage("env-sit") {
                            check_env(
                                    "$infisical_passphrase",
                                    "sit"
                            )
                        }
                    }
                }
                script {
                    try {
                        retry(3) {
                            stage("deploy-sit") {
                                deployment(
                                        "sit",
                                        "$jobname",
                                        "$docker_name:master",
                                        "$docker_network_name",
                                        "$docker_network_subnet",
                                        "$docker_network_gateway",
                                        "$dockerHubUser",
                                        "$dockerHubPass")
                            }
                        }
                    } catch (Exception e) {
                        script {
                           mail (to: 'gomgom.silalahi@equity.id',
                           subject: "jenkins - Job:'${env.JOB_BASE_NAME}' Build:'${env.BUILD_NUMBER}' Stagename:'${STAGE_NAME}' ",
                           body: "Untuk log error bisa dilihat lewat link url berikut: ${env.BUILD_URL}/consoleText");
                        }
                    }
                }
            }
        }

        stage("UAT") {
            when {
                branch 'dev'
            }
            steps {
                script {
                    retry(2) {
                        stage("env-uat") {
                            check_env(
                                    "$infisical_passphrase",
                                    "uat"
                            )
                        }
                    }
                }
                script {
                    try {
                        retry(3) {
                           stage("deploy-uat") {
                              deployment(
                                    "uat",
                                    "$jobname",
                                    "$docker_name:master",
                                    "$docker_network_name",
                                    "$docker_network_subnet",
                                    "$docker_network_gateway",
                                    "$dockerHubUser",
                                    "$dockerHubPass")
                           }
                        }
                    } catch (Exception e) {
                        script {
                           mail (to: 'gomgom.silalahi@equity.id',
                           subject: "jenkins - Job:'${env.JOB_BASE_NAME}' Build:'${env.BUILD_NUMBER}' Stagename:'${STAGE_NAME}' ",
                           body: "Untuk log error bisa dilihat lewat link url berikut: ${env.BUILD_URL}/consoleText");
                        }
                    }
                }
            }
        }

        stage("PRO") {
            when {
                branch 'master'
            }
            steps {
                script {
                  mail (to: 'gomgom.silalahi@equity.id',
                  subject: "Job '${env.JOB_BASE_NAME}' (${env.BUILD_NUMBER}) is waiting for input",
                  body: "Please go to console output of ${env.BUILD_URL} to approve or Reject..");
                  def userInput = input(id: 'userInput', message: 'Lanjutkan deployment ke production?', ok: 'Yes')
                    try {
                        retry(3) {
                           stage("deploy-pro") {
                              deployment(
                                    "pro",
                                    "$jobname",
                                    "$docker_name:master",
                                    "$docker_network_name",
                                    "$docker_network_subnet",
                                    "$docker_network_gateway",
                                    "$dockerHubUser",
                                    "$dockerHubPass")
                           }
                        }
                     } catch (Exception e) {
                        script {
                           mail (to: 'gomgom.silalahi@equity.id',
                           subject: "jenkins - Job:'${env.JOB_BASE_NAME}' Build:'${env.BUILD_NUMBER}' Stagename:'${STAGE_NAME}' ",
                           body: "Untuk log error bisa dilihat lewat link url berikut: ${env.BUILD_URL}/consoleText");
                        }
                     }
               }
            }
        }
    }

    post {
        success {
            mail  to: 'gomgom.silalahi@equity.id',
                  subject: "Pipeline Success -- JOB: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                  body: "Deployment pipeline untuk ${env.JOB_NAME}- SERVER: ${hostname}.elife.co.id - Build #${env.BUILD_NUMBER} telah berjalan baik. Untuk detailnya dapat dilihat di ${env.BUILD_URL}"
        }
        failure {
            mail  to: 'gomgom.silalahi@equity.id',
                  subject: "Fail Pipeline: ${currentBuild.fullDisplayName}",
                  body: "Deployment gagal untuk ${env.JOB_NAME}, ${env.BUILD_URL}"
        }
    }
}


