require_relative '../../../spec/app/spec_helper.rb'

describe MeetingUserLink do
	include_context "shared lets"
  
  
  ### ----------------- ###
  ###    Associations   ###
  ### ----------------- ###

  
  describe '#meeting' do

    it 'should be a Meeting', :belongings => true do
      meeting_user_link_1.save
      expect(meeting_user_link_1.meeting.class).to be Meeting
    end

  end
  
  describe '#user' do

    it 'should be a User', :belongings => true do
      meeting_user_link_1.save
      expect(meeting_user_link_1.user.class).to be User
    end

  end
end