# Project Structure

# Folders in src/

- app/demo/ - main exposed federation entry component (DemoComponent) and its DemoConfig
- app/demo/views/demo-table/ - mock data table sub-component rendered when view === 'table'
- app/demo/views/demo-create-form/ - simulated create-form sub-component rendered when view === 'create-form'
- app/demo/views/demo-profile/ - read-only profile / detail card sub-component rendered when view === 'profile'
- app/demo-preview/ - standalone preview host used when running ng serve without the Shell

# Other folders

- .kilo/modes/ - built-in agent mode prompt overrides
- docs/: Documentation files
