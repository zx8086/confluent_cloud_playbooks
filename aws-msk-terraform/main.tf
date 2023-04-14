provider "http" {
  # Configuration options
}

data "http" "dev" {
  url = "http://connect.dev.shared-services.eu.pvh.cloud/connectors"

  # Optional request headers
  request_headers = {
    Accept = "application/json"
  }
}

data "http" "stg-dcos" {
  url = "http://kafka-connect.beta53.kafka.marathon.dcos-eu.pvhcorp.com:8083/connectors"

  # Optional request headers
  request_headers = {
    Accept = "application/json"
  }
}

data "http" "stg" {
  url = "http://connect.stg.shared-services.eu.pvh.cloud/connectors"

  # Optional request headers
  request_headers = {
    Accept = "application/json"
  }
}

data "http" "prd-dcos" {
  url = "http://kafka-connect.production53.kafka.marathon.dcos-eu.pvhcorp.com:8083/connectors"

  # Optional request headers
  request_headers = {
    Accept = "application/json"
  }
}

data "http" "prd" {
  url = "http://connect.prd.shared-services.eu.pvh.cloud/connectors"

  # Optional request headers
  request_headers = {
    Accept = "application/json"
  }
}

output "dev" {
  value = jsondecode(data.http.dev.response_body)
}

output "stg-dcos" {
  value = jsondecode(data.http.stg-dcos.response_body)
}

output "stg" {
  value = jsondecode(data.http.stg.response_body)
}

output "prd-dcos" {
  value = jsondecode(data.http.prd-dcos.response_body)
}

output "prd" {
  value = jsondecode(data.http.prd.response_body)
}