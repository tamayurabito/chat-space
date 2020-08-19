require 'rails_helper'

describe MessagesController do
  let(:user) {create(:user)}
  let(:group) {create(:group)}

  describe 'GET #index' do
    context 'ログインしている場合' do
      before do
        login user
        get :index , params: {group_id: group.id}
      end
      it '@messageに期待した値が入っていること' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it '@groupに期待した値が入っていること' do
        expect(assigns(:group)).to eq group
      end
      # it '@messagesに期待した値が入っていること' do
      #   messages = create_list(:message,3)
      #   expect(assigns(:messages)).to match(messages)
        
      # end
      it '該当するビューが描画されているか' do
        expect(response).to render_template :index
      end
    end
    context 'ログインしていない場合' do
      before do
        get :index, params:{group_id:group.id}
      end
      it 'ログイン画面にリダイレクトする事' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end


  describe '#create' do

    let(:params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message)}}

    context 'ログインしている場合' do
      before do
        login user
      end
      context 'メッセージの保存に成功した場合' do
        subject {post :create,params: params}
        it 'messageを保存すること' do
          expect{subject}.to change(Message, :count).by(1)
        end
        it 'group_messages_pathに遷移しているか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
      context 'メッセージの保存に失敗した場合' do
        let(:invalid_params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil)}}
        subject {post :create, params: invalid_params}
        it 'メッセージの保存は行われなかったか' do
          # expect{subject}.to change(Message, :count).by(0)
          expect{subject}.not_to change(Message, :count)
        end
        it '意図したビューが描画されているか' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context 'ログインしていない場合' do
      it 'new_user_session_pathにリダイレクトできているか' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end