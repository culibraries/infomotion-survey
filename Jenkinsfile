node {
    def gitURL = 'git@github.com:culibraries/infomotion-survey.git'
    def imageName = 'culibraries/infomotion'
    def imageTag = '1.4.1'

    def namespace = 'cybercom'
    def clusterName = 'cu-libraries'
    def contextName = 'cu-libraries'
  try {
    slackSend message: "${imageName}:${imageTag} : START"
    stage('CHECKOUT') {
      git(branch: 'devops', credentialsId: 'dutr5288-github', url: "${gitURL}")
    }

    stage('BUILD') {
      app = docker.build("${imageName}:${imageTag}")
    }

    stage('PUSH TO DOCKERHUB') {
      docker.withRegistry( '', 'trinhdh-dockerhub' ) {
        app.push()
      }
    }
    stage('DEPLOY:-> STAGING') {
      withKubeConfig([credentialsId: 'rancher-kubectl',
                      serverUrl: 'https://libops.colorado.edu/k8s/clusters/c-bjn7n',
                      clusterName: "${clusterName}",
                      namespace: "${namespace}",
                      contextName: "${contextName}"]) {
        sh "kubectl set image deployment/test-infomotion test-infomotion=${imageName}:${imageTag}"
        }
     }
    stage('CLEAN UP') {
     sh 'docker image prune -a -f'
     slackSend message: "${imageName}:${imageTag} : Finished: SUCCESS - Build #: ${env.BUILD_NUMBER} - Log: http://libbox.colorado.edu/job/staging/job/infomotion/${env.BUILD_NUMBER}/consoleText"
   }
  } catch (Exception ex) {
    sh 'docker image prune -a -f'
    slackSend message: "${imageName}:${imageTag} : Finished: FAILED - Build #: ${env.BUILD_NUMBER} - Log: http://libbox.colorado.edu/job/staging/job/infomotion/${env.BUILD_NUMBER}/consoleText"
  }

}
