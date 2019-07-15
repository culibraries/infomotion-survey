node {
  /*
    stage('CHECKOUT') {
        git(branch: 'devops', credentialsId: 'dutr5288-github', url: 'git@github.com:culibraries/infomotion-survey.git')
    }
    stage('BUILD') {
        app = docker.build('culibraries/infomotion:1.1.0')
    }
    stage('PUSH TO DOCKERHUB') {
      docker.withRegistry( '', 'trinhdh-dockerhub' ) {
        app.push()
      }
    }*/
   stage('DEPLOY') {
    withKubeConfig([credentialsId: 'rancher-kubectl', 
                    serverUrl: 'https://libops.colorado.edu/k8s/clusters/c-bjn7n',
                    clusterName: 'cu-libraries',
                    namespace: 'cybercom']) {
      sh 'kubectl set image deployment/test-infomotion test-infomotion=culibraries/infomotion:1.1.0'
    }
  }
}
