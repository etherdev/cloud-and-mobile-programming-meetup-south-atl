require 'rubygems'
require 'data_mapper'
require 'dm-postgres-adapter'
require 'pg'
require 'sinatra/base'
require 'mustache/sinatra'
require 'puma'
require 'roar/representer/json'
require 'roar/representer/feature/hypermedia'
require 'pry'
require 'pry-remote'
require 'pry-doc'

# Load all entities first.
Dir["./app/entities/*.rb"].each do |file|
  require file
end

# Load all services second.
Dir["./app/services/**/*.rb"].each do |file|
  require file
end

# Load all representers third.
Dir["./app/representers/**/*.rb"].each do |file|
  require file
end

require './implementation/web/views/global_views.rb'
# Load all implementation files.
Dir["./implementation/**/*.rb"].each do |file|
  require file
end