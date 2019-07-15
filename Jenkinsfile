node {
    def gitURL = 'git@github.com:culibraries/infomotion-survey.git'
    def imageName = 'culibraries/infomotion'
    def imageTag = '1.1.0'
  
    def namespace = 'cybercom'
    def clusterName = 'cu-libraries'
  
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
                      namespace: "${namespace}" ]) {
        sh "kubectl set image deployment/test-infomotion test-infomotion=${imageName}:${imageTag}"
        }
     }
    stage('CLEAN UP') {
     sh 'docker image prune -f'
   } 
}
