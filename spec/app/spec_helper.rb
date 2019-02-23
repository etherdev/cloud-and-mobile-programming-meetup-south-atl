require 'data_mapper'
require 'pg'
require 'dm-postgres-adapter'
require 'roar/representer/json'
require 'roar/representer/feature/hypermedia'
require 'rspec'
require 'dm-rspec'
require 'rack/test'
require 'pry'
require 'roar/representer/json'
require 'roar/representer/feature/hypermedia'
require 'database_cleaner'
require 'dm-noisy-failures'
require_relative 'shared_lets'

# Load all domain files.
Dir["./app/entities/*.rb"].each do |file|
 require file
end

DataMapper.setup(:default, 'postgres://barbarafraim:@localhost/meetup_test')
DataMapper.finalize.auto_upgrade!

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
  conf.include DataMapper::Matchers
  DatabaseCleaner.strategy = :truncation
  conf.before(:each) { DatabaseCleaner.clean_with(:truncation) }
end
 