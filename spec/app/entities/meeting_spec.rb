require_relative '../../../spec/app/spec_helper.rb'

describe Meeting do
	include_context "shared lets"
  
	describe '#description' do
  	
		it "should set a String" do
			meeting_1.save
		  expect(meeting_1.description).to be_kind_of String
		end
 
  end
  
	describe '#date' do
  	
		it "should set a Date" do
			meeting_1.save
		  expect(meeting_1.date).to be_kind_of Date
		end
 
  end
  
  ### ----------------- ###
  ###    Associations   ###
  ### ----------------- ###
  
  
  describe '#meeting_user_links' do
    
    it 'should be an array with multiple instances', :associations => true do
      meeting_1.meeting_user_links << meeting_user_link_1
      meeting_1.meeting_user_links << meeting_user_link_3
      meeting_1.save
      expect(meeting_1.meeting_user_links.count).to eq 2
    end
    
  end
  
  describe '#users' do
    
    it 'should be an array with multiple instances', :associations => true do
      meeting_1.users << user_1
      meeting_1.users << user_2
      meeting_1.save
      expect(meeting_1.users.count).to eq 2
    end
    
  end
  
  describe '#ideas' do
    
    it 'should be an array with multiple instances', :associations => true do
      meeting_1.ideas << idea_1
      meeting_1.ideas << idea_2
      meeting_1.save
      expect(meeting_1.ideas.count).to eq 2
    end
    
  end
end