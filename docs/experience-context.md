# Work Experience Context

Source material for the portfolio's Experience section and for tailoring resumes.
The bullets shown on the site live in
`src/pages/home/components/experience/experience.section.tsx` (mirrored in
`public/locales/en/experience.json`); this file holds the fuller set to pick from.

## Rivian and Volkswagen Technologies

**Software Engineering Intern, Systems Integrations** | Irvine, CA | Sep. 2026 - Present

### Automation and AI agents

- Build automation workflows in Python using AI agents (Devin) that integrate across internal platforms including Slack and Databricks.
- Critically review and validate AI-generated outputs before they reach production, keeping a human in the loop for reliability.
- Use Gen AI and LLM coding tools (Devin) to speed up development, testing and documentation of integration code.

### CI/CD and DevOps

- Manage GitLab CI/CD pipelines and DevOps practices to safely deploy changes to production systems.
- Work in Git-based collaborative workflows across cross-platform systems integration projects.

### Testing and quality

- Automate testing with pytest, applying debugging and testing practices to catch regressions early.
- Improve the quality and reliability of integration code through automated test coverage.

### Data and dashboards

- Build data visualization dashboards that filter and derive meaningful signals from operational metrics.
- Independently learn unfamiliar platforms to surface actionable observations for the team.

## Hewlett Packard Enterprise

**Cloud Developer 1** | Bangalore, India | Jan. 2023 - Aug. 2025

### Distributed systems and automation (strongest impact)

- Designed and built a distributed provisioning system in Python and Ansible to orchestrate ESXi/vCenter cloud environments across multi-node enterprise clusters.
- Reduced deployment time from 6 days to 5 hours (97% reduction), contributing to $40M+ in revenue.
- Engineered scalable orchestration workflows and automation pipelines for infrastructure lifecycle management on Baremetal servers and ESXi Hypervisors.
- Automated DNS setup, virtual switch creation and zero-downtime VM migration (vSS to vDS).

### Backend and APIs

- Built internal REST APIs and CLI tooling in Python to expose provisioning status and trigger deployments.
- Integrated those services with enterprise monitoring and ticketing systems, improving cross-team visibility.

### Software design

- Architected modular, reusable Python components for provisioning Linux systems (RHEL 8.8/9.2, SUSE 15 SP5) in SAP HANA-based solutions.
- Improved maintainability and reduced configuration errors across large-scale deployments.

### Security

- Implemented secure credential management using AES-256 encryption integrated with HashiCorp Vault, strengthening the security posture of production systems handling sensitive configuration data.

### Collaboration

- Worked with cross-functional infrastructure and product teams in an Agile environment.
- Debugged issues and took part in code review using Git-based version control.

### Other

- Implemented multilingual support in the automation application, improving adoption across international teams. (Previously on the site; dropped in favor of the REST API bullet.)

## Sam IT Consultancy Services

**Software Engineering Intern** | London, UK (Remote) | Aug. 2020 - Oct. 2020

- Built an end-to-end machine learning pipeline in Python using PyTorch LSTM models to classify 100K+ unstructured client emails into fine-grained sentiment categories.
- Reached 95% accuracy through data preprocessing, sequence modeling, model evaluation and hyperparameter tuning.
- Developed a backend ticket prioritization system with a REST API, reducing manual triage effort and improving client response efficiency.
- Wrote unit and integration tests, documented technical designs and refined data preprocessing scripts with senior engineers.

## Which bullets to use for which kind of role

- **Backend, infrastructure or platform:** lead with the HPE provisioning, orchestration, REST API and Vault bullets, then the Rivian CI/CD bullet.
- **AI, ML or data:** lead with Rivian agents and dashboards, then Sam IT's ML pipeline, and trim HPE to 3 or 4 bullets.
- **General SWE:** keep a mix, with the 97% and $40M+ bullet first, since it's the most convincing number.
