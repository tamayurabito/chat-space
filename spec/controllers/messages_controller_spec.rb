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