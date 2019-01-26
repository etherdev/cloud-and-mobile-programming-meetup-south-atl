require_relative '../../../spec/app/spec_helper.rb'

describe Idea do
	include_context "shared lets"
  
	describe '#title' do
  	
		it "should set a String" do
			idea_1.save
		  expect(idea_1.title).to be_kind_of String
		end
    
	end
  
	describe '#description' do
  	
		it "should set a String" do
			idea_1.save
		  expect(idea_1.description).to be_kind_of String
		end
    
	end
  
	describe '#note' do
  	
		it "should set a String" do
			idea_1.save
		  expect(idea_1.note).to be_kind_of String
		end
    
	end
  
  ### ----------------- ###
  ###    Associations   ###
  ### ----------------- ###
  
  describe '#user' do
    
    it 'should be a User', :belongings => true do
      idea_1.save
      expect(idea_1.user.class).to be User
    end
    
  end
  
  describe '#meeting' do
    
    it 'should not be required', :belongings => true do
      idea_1.meeting = nil
      idea_1.save
      expect(idea_1.meeting).to be_nil
    end
    
    it 'should be a Meeting', :belongings => true do
      idea_1.save
      expect(idea_1.meeting.class).to be Meeting
    end
    
  end
end