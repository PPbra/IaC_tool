module.exports = {
        generator: (config)=>{
            return (
`
resource "google_compute_instance" "${!!config.name?config.name:"default"}" {
    name = "${!!config.name?config.name:"default"}"
    machine_type = "${!!config.machine_type?config.machine_type:"f1-micro"}"
    zone         = "${!!config.zone?config.zone:"us-west1-a"}"
      
    boot_disk {
          initialize_params {
          image = "${!!config.image?config.image:"debian-cloud/debian-9"}"
        }
    }
    network_interface {
        network = google_compute_network.${!!config.vpc?config.vpc:"vpc"}.name
        subnetwork = google_compute_subnetwork.${!!config.subnet?config.subnet:"public_subnet_1"}.name
    }
    ${!!config.description?`description = "${config.description}"`:``}
    ${!!config.allow_stopping_for_update?`allow_stopping_for_update = "${config.allow_stopping_for_update}"`:``}
    ${!!config.attached_disk?`allow_stopping_for_update = "${config.attached_disk}"`:``}
    ${!!config.can_ip_forward?`can_ip_forward = "${config.can_ip_forward }"`:``}
    ${!!config.desired_status?`desired_status = "${config.desired_status }"`:``}
    ${!!config.deletion_protection?`deletion_protection = "${config.deletion_protection }"`:``}
    ${!!config.hostname?`hostname = "${config.hostname }"`:``}
    ${!!config.guest_accelerator?`guest_accelerator = "${config.guest_accelerator }"`:``}
    ${!!config.labels?`labels = "${config.labels }"`:``}
    ${!!config.metadata?`metadata = {
        ssh-keys = "${config.metadata.key}"
    }`:``}
    ${!!config.metadata_startup_script?`metadata_startup_script = "${config.metadata_startup_script }"`:``}
    ${!!config.min_cpu_platform?`min_cpu_platform = "${config.min_cpu_platform }"`:``}
    ${!!config.project?`project = "${config.project }"`:``}
    ${!!config.scheduling?`scheduling = "${config.scheduling }"`:``}
    ${!!config.scratch_disk?`scratch_disk = "${config.scratch_disk }"`:``}
    ${!!config.service_account?`service_account = "${config.service_account }"`:``}
    ${!!config.tags?`tags = "${config.tags }"`:``}
    ${!!config.shielded_instance_config?`shielded_instance_config = "${config.shielded_instance_config }"`:``}
    ${!!config.enable_display?`enable_display = "${config.enable_display }"`:``}
    ${!!config.resource_policies?`resource_policies = "${config.resource_policies }"`:``}
    }
`                
            )
        }
}