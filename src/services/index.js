class Service {
  constructor(repository) {
    this.repository = repository;
  }

  registerServices() {
    this.repository.registerRepositories();
  }
}

export default Service;
