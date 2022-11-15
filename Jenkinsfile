#!groovy
//  groovy Jenkinsfile
properties([disableConcurrentBuilds()])

pipeline  {
    
     agent { 
        label 'main'
        }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
        timestamps()
    }
    stages {
        stage("docker login") {
            steps {
                echo " ============== docker login =================="
                withCredentials([usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                    docker login -u $USERNAME -p $PASSWORD
                    '''
                }
            }
        }
        
        stage("Removing all containers") {
            steps {
                echo 'Removing containers ...'
                    sh "docker ps -q --filter 'name=compass_frontend' && docker stop compass_frontend || echo Not stoped"
                    sh "docker ps -q --filter 'name=compass_frontend' && docker rm compass_frontend || echo Not removed"
                echo 'I did it!'
                
            }
        }
        stage("Removing old images") {
            steps {
                echo 'Removing images ...'
                 dir('.'){
                    sh "docker rmi niki228041/compass_frontend"
                }
            }
        }
        stage("Creating images") {
            steps {
                echo 'Creating docker image ...'
                    dir('.'){
                    sh "docker build -t niki228041/compass_frontend ."
                }
            }
        }
        
        stage("docker push image") {
            steps {
                echo " ============== pushing image =================="
                sh '''
                docker push niki228041/compass_frontend:latest
                '''
            }
        }
        
        stage("docker run") {
            steps {
                echo " ============== starting frontend =================="
                sh '''
                docker run -d --restart=always --name compass_frontend -p 80:3000 niki228041/compass_frontend:latest
                '''
            }
        }
    }
}
