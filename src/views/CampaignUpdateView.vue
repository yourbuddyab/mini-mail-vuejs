<template>
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <h3 class="text-center">Add Email Content for Campaign</h3>
            <form @submit.prevent="addEmailContent">
                <div class="mb-3">
                    <label for="emailSubject" class="form-label">Campaign Subject/Name</label>
                    <input type="text" class="form-control" id="emailSubject" v-model="name" required />
                </div>
                <div class="mb-3">
                    <label for="emailBody" class="form-label">Email Body</label>
                    <textarea class="form-control" id="emailBody" rows="6" v-model="email_body" required></textarea>
                </div>
                <div class="mb-3">
                    <div class="form-check d-flex">
                        <div class="col-md-5">
                            <input class="form-check-input" type="checkbox"
                                checked="{{ check_scheduled ? true : false }}" v-model="check_scheduled"
                                id="schedule" />
                            <label class="form-check-label" for="schedule">Scheduled at</label>
                        </div>
                        <div class="col-md-7" v-if="check_scheduled">
                            <input type="datetime-local" class="form-control" id="emailSubject"
                                v-model="scheduled_at" />
                        </div>
                    </div>

                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-primary w-100 mt-4">Add Email Content</button>
                </div>
            </form>
        </div>
        <div class="col-md-2"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CampaignEmailContent",
    data() {
        return {
            name: '',
            email_body: '',
            check_scheduled: '',
            scheduled_at: '',
            campaignId: this.$route.params.id
        };
    },
    methods: {
        async fetchCampaign() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/campaign/${this.campaignId}/edit`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                this.email_body = response.data.data.contant;
                this.name = response.data.data.name;
                this.check_scheduled = response.data.data.scheduled_at ? 1 : 0
                this.scheduled_at = response.data.data.scheduled_at
            } catch (error) {
                console.error(error);
                alert('Failed to fetch campaigns.');
            }
        },
        async addEmailContent() {

            if (!this.name || !this.email_body) {
                alert('Please fill in both fields.');
                return;
            }

            try {
                const response = await axios.patch(`http://127.0.0.1:8000/api/campaign/${this.campaignId}`, {
                    contant: this.email_body,
                    name: this.name,
                    scheduled_at: this.scheduled_at,
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Add token to the request
                    }
                });

                if (response.data.success) {
                    this.$router.push({ name: 'Campaign Index' });
                } else {
                    alert('Failed to add email content.');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while adding email content.');
            }
        }
    },
    mounted() {
        this.fetchCampaign();
    }
};
</script>