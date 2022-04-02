from django import forms

class Registration_form(forms.Form):
    username = forms.CharField(label="New Username", max_length=200)
    password = forms.CharField(label="New Password", max_length=200, widget=forms.PasswordInput())
    output = ""

#Not sure what to use for label. Does this show in the submission box for the form?
class Retrieval_form(forms.Form):
    input = forms.CharField(label="Retrieve", max_length=200)
    #output = ""

class Retrieve_attributes_form(forms.Form):
    song = forms.CharField(label="Retrieve: ", max_length=255)