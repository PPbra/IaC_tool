const map_config =  require("../map-config/firewall");

const configCode = (allows,denies)=>{
  let code = ``;
  allows.forEach((e)=>{
    code += `allow {
      protocol:"${e.protocol}"
      ports:${e.ports.map(port=>`"${port.toString()}"`)}
    }`
  })
  denies.forEach((e)=>{
    code += `deny {
      protocol:"${e.protocol}"
      ports:${e.ports.map(port=>`"${port.toString()}"`)}
    }`
  })
}

const generator = (config)=>{
  return (
`
resource "google_compute_firewall" "${!!config.name?config.name:"default_firewall"}" {
name = "${!!config.name?config.name:"default_firewall"}"
network = "${!!config.google_compute_network?config.google_compute_network:"default_vpc"}"
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
${configCode(config.allows,config.denies)}
}
`
  )
}

const mapping = config=>generator(map_config.gcp(config));



module.exports ={
  generator,mapping
}