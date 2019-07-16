node {
    def gitURL = 'git@github.com:culibraries/infomotion-survey.git'
    def imageName = 'culibraries/infomotion'
    def imageTag = '1.1.3'
  
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
    stage('DEPLOY') {
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
     slackSend message: "${imageName}:${imageTag} : BUILD SUCCESS"
   } 
  } catch (Exception ex) {
    sh 'docker image prune -a -f'
    slackSend message: "${imageName}:${imageTag} : FAIL !!!"
  }
    
}
