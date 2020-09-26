const { config } = require("../aws/ec2")

module.exports =  {
    generator: ()=>{
        return (
`
resource "google_compute_firewall" "${!!config.name?config.name:"default_firewall"}" {
    name = "${!!config.name?config.name:"default_firewall"}"
    network = "${!!config.vpc?config.vpc:"default_vpc"}"
    ${!!config.description?`description = "${config.description}"`:``}
    ${!!config.destination_ranges?`destination_ranges = "${config.destination_ranges}"`:``}
    ${!!config.direction?`direction = "${config.direction}"`:``}
    ${!!config.disabled?`disabled = "${config.disabled}"`:``}
    ${!!config.log_config?`log_config = "${config.log_config}"`:``}
    ${!!config.priority?`priority = "${config.priority}"`:``}
    ${!!config.source_ranges?`source_ranges = "${config.source_ranges}"`:``}
    ${!!config.source_service_accounts?`source_service_accounts = "${config.source_service_accounts}"`:``}
    ${!!config.source_tags?`source_tags = "${config.source_tags}"`:``}
    ${!!config.target_service_accounts?`target_service_accounts = "${config.target_service_accounts}"`:``}
    ${!!config.target_tags?`target_tags = "${config.target_tags}"`:``}
    ${!!config.project?`project = "${config.project}"`:``}
    ${!!config.enable_logging?`enable_logging = "${config.enable_logging}"`:``}
    ${!!config.allow?`allow {
        protocol = "${!!config.allow.protocol?config.allow.protocol:"http"}"
        ports    = ["${!!config.allow.ports?config.allow.ports:"80,8080"}"]
      }`:``}
    ${!!config.deny?`deny {
        protocol = "${!!config.deny.protocol?config.deny.protocol:"http"}"
        ports    = ["${!!config.deny.ports?config.deny.ports:"3308,3380"}"]
    }`:``}
  }
`
        )
    }
}