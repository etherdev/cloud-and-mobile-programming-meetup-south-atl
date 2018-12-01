shared_context "shared lets" do
	
  let(:idea_1) {Idea.new(title: "string",
                         note: "string",
                         user: user_1,
                         meeting: meeting_1
                         )}
  
  let(:idea_2) {Idea.new(title: "string",
                         note: "string",
                         user: user_1,
                         meeting: meeting_2
                         )}
  
  let(:meeting_user_link_1) { MeetingUserLink.new(meeting: meeting_1,
                                                  user: user_1
                                                  )}
  
  let(:meeting_user_link_2) { MeetingUserLink.new(meeting: meeting_2,
                                                  user: user_1
                                                  )}
                                                  
  let(:meeting_user_link_3) { MeetingUserLink.new(meeting: meeting_1,
                                                  user: user_2
                                                  )}

  let(:meeting_user_link_4) { MeetingUserLink.new(meeting: meeting_2,
                                                  user: user_2
                                                  )}
                            
  let(:meeting_1) { Meeting.new(description: "string",
                                date: Time.now
                                )}
  
  let(:meeting_2) { Meeting.new(description: "string",
                                date: Time.now
                                )}

  let(:user_1) {User.new(email: "user1@string.com",
                         first_name: "string",
                         last_name: "string",
                         phone: "string",
                         birthday: Date.new(1973,2,28),
                         gender: 0,
                         note: "string"
                         )}
                       
  let(:user_2) {User.new(email: "user2@string.com",
                         first_name: "string",
                         last_name: "string",
                         phone: "string",
                         birthday: Date.new(1973,2,28),
                         gender: 0,
                         note: "string"
                         )}
                        
  let(:bad_user) {User.new(email: "string",
                           first_name: "string",
                           last_name: "string",
                           phone: "string",
                           birthday: Date.new(1973,2,28),
                           gender: 0,
                           note: "string"
                           )}
                                                                                                                     
end