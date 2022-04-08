class StaticPagesController < ApplicationController
  before_action :user_signed_in?

  def login; end

  private

  def user_signed_in?
    redirect_to dashboard_path if current_user
  end
end
