# confluent_cloud_playbooks

`ansible-playbook -i cc_setup/inventory/home.yaml confluent.yaml --limit targets --tags create_synthetics_connector_monitor  --ask-vault-pass --extra-vars "ENVIRONMENT_SHORT=dev"`

`ansible-playbook -i cc_setup/inventory/home.yaml confluent.yaml --limit targets --tags create_synthetics_api_health_monitor  --ask-vault-pass --extra-vars "ENVIRONMENT_SHORT=dev"`

`ansible-playbook -i cc_setup/inventory/home.yaml confluent.yaml --limit targets --tags create_slo_monitor --ask-vault-pass --extra-vars "ENVIRONMENT_SHORT=prd"`