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

data "http" "stg" {
  url = "http://connect.stg.shared-services.eu.pvh.cloud/connectors"

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

output "stg" {
  value = jsondecode(data.http.stg.response_body)
}

output "prd" {
  value = jsondecode(data.http.prd.response_body)
}