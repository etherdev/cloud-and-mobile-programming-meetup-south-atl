require_relative '../../../spec/app/spec_helper.rb'

describe User do
	include_context "shared lets"
    
	describe '#email' do
  	
		it "should set a String" do
			user_1.save
		  expect(user_1.email).to be_kind_of String
		end
    
    it "should raise a Datamapper::SaveFailure when email is improperly formatted" do
      user_1.email = "string"
      expect{user_1.save}.to raise_error(DataMapper::SaveFailureError)
    end
    
    it "should raise a Datamapper::SaveFailure when empty" do
      user_1.email = ""
      expect{user_1.save}.to raise_error(DataMapper::SaveFailureError)
    end

    it "should have the appropriate message for an improperly formatted email" do
      user_1.email = "string"
      expect{user_1.save}.to raise_error("User: Doesn't look like an email address to me ...")
    end

	end
	
	describe '#first_name' do
  	
		it "should set a String" do
			user_1.save
		  expect(user_1.first_name).to be_kind_of String
		end
    
	end
	
	describe '#last_name' do
  	
		it "should set a String" do
			user_1.save
		  expect(user_1.last_name).to be_kind_of String
		end
    
	end
  
	describe '#phone' do
  	
		it "should set a String" do
			user_1.save
		  expect(user_1.phone).to be_kind_of String
		end
		
	end
  
	describe '#birthday' do
  	
		it "should set a Date" do
			user_1.save
		  expect(user_1.birthday).to be_kind_of Date
		end
		
	end
  
	describe '#gender' do
  	
		it "should set a Integer" do
			user_1.save
		  expect(user_1.gender).to be_kind_of Integer
		end
		
	end
  
	describe '#note' do
  	
		it "should set a String" do
			user_1.save
		  expect(user_1.note).to be_kind_of String
		end
    
	end

	
	describe '#status' do
  	
		it "should set an Integer" do
			user_1.save
		  expect(user_1.status).to be_kind_of Integer
		end
    
		it "should set default status to 0" do
			user_1.save
		  expect(user_1.status).to eq 0
		end
		
	end
  
  ### ----------------- ###
  ###    Associations   ###
  ### ----------------- ###
  
  
  describe '#meeting_user_links' do
    
    it 'should be an array with multiple instances', :associations => true do
      user_1.meeting_user_links << meeting_user_link_1
      user_1.meeting_user_links << meeting_user_link_2
      user_1.save
      expect(user_1.meeting_user_links.count).to eq 2
    end
    
  end
  
  describe '#meetings' do
    
    it 'should be an array with multiple instances', :associations => true do
      user_1.meetings << meeting_1
      user_1.meetings << meeting_2
      user_1.save
      expect(user_1.meetings.count).to eq 2
    end
    
  end
  
  describe '#ideas' do
    
    it 'should be an array with multiple instances', :associations => true do
      user_1.ideas << idea_1
      user_1.ideas << idea_2
      user_1.save
      expect(user_1.ideas.count).to eq 2
    end
    
  end
  
end