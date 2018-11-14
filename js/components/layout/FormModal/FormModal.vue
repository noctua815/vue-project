<template>
<div class="fw" v-if="$formModal.showModal">
    <div class="fw-wr" v-if="!showMessage">
        <div class="fw-head">
            <div class="fw-head-title pse-head" v-html="data.text.head.title"></div>

            <!-- Mobile selected item -->
            <div class="fw-mobile-trial" v-if="trial && $mq !== 'desktop'">
                <div class="fw-form-submit-product">
                    <h-product-item :data="$config.trial"></h-product-item>
                    <input type="hidden" :name="data.form.formName + '-product'" :value="$config.trial.id">
                </div>
            </div>
            <!-- END Mobile selected item -->

            <div class="fw-head-info" v-html="data.text.head.info"></div>
        </div>
        <div class="fw-body">
            <div class="fw-form">
                <form class="form" ref="form">
                    <div class="fw-form-fields">
                        <div class="fw-form-col">
                            <v-input v-if="data.form.name.show"
                                    :name="data.form.formName + '-name'"
                                    :id="data.form.formName + '-name'"
                                    v-validate="'required'"
                                    data-vv-value-path="innerValue"
                                    :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-name')"
                                    v-model="request.name"
                                    :label="data.form.name.text"
                                    type="text"></v-input>

                            <v-input v-if="data.form.lastName.show"
                                    :name="data.form.formName + '-last-name'"
                                    :id="data.form.formName + '-last-name'"
                                    v-validate="'required'"
                                    data-vv-value-path="innerValue"
                                    :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-last-name')"
                                    v-model="request.lastName"
                                    :label="data.form.lastName.text"
                                    type="text"></v-input>

                            <v-input v-if="data.form.post.show"
                                    :name="data.form.formName + '-post'"
                                    :id="data.form.formName + '-post'"
                                    v-validate="'required'"
                                    data-vv-value-path="innerValue"
                                    :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-post')"
                                    v-model="request.post"
                                    :label="data.form.post.text"
                                    type="text"></v-input>

                            <v-input v-if="data.form.org.show"
                                    :name="data.form.formName + '-organization'"
                                    :id="data.form.formName + '-organization'"
                                    v-validate="'required'"
                                    data-vv-value-path="innerValue"
                                    :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-organization')"
                                    v-model="request.organization"
                                    :label="data.form.org.text"
                                    type="text"></v-input>
                        </div>
                        <div class="fw-form-col">
                            <v-input v-if="data.form.orgAddress.show"
                                    :name="data.form.formName + '-org-address'"
                                    :id="data.form.formName + '-org-address'"
                                    ref="org-address"
                                    v-validate="'required'"
                                    data-vv-value-path="innerValue"
                                    :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-org-address')"
                                    v-model="request.orgAddress"
                                    :label="data.form.orgAddress.text"
                                    type="text"></v-input>

                            <v-input v-if="data.form.phone.show"
                                    :name="data.form.formName + '-phone'"
                                    :id="data.form.formName + '-phone'"
                                    v-validate="'required|phoneNumber'"
                                    data-vv-value-path="innerValue"
                                    :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-phone')"
                                    v-model="request.phone"
                                    :label="data.form.phone.text"
                                    type="tel"></v-input>

                            <v-input v-if="data.form.email.show"
                                    :name="data.form.formName + '-email'"
                                    :id="data.form.formName + '-email'"
                                    v-validate="'required|email'"
                                    data-vv-value-path="innerValue" :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-email')"
                                    v-model="request.email"
                                    :label="data.form.email.text"
                                    type="text"></v-input>

                            <v-input v-if="data.form.site.show"
                                    :name="data.form.formName + '-site'"
                                    :id="data.form.formName + '-site'"
                                    v-validate="'required'"
                                    data-vv-value-path="innerValue"
                                    :field-error="errors"
                                    :has-error="errors.has(data.form.formName + '-site')"
                                    v-model="request.site"
                                    :label="data.form.site.text"
                                    type="text"></v-input>
                        </div>

                        <!-- Order id list -->
                        <input v-if="orders" class="visuallyhidden" type="hidden" name="products" :value="orders">

                        <!-- Waste id -->
                        <input v-if="waste" class="visuallyhidden" type="hidden" :name="data.form.formName + '-id'" :value="waste">

                        <!-- Promo id -->
                        <input v-if="promo" class="visuallyhidden" type="hidden" :name="data.form.formName + '-id'" :value="promo">

                        <!-- Service -->
                        <input v-if="service" class="visuallyhidden" type="hidden" :name="data.form.formName + '-service'" :value="service">
                    </div>

                    <div class="fw-form-textarea" v-if="data.form.comment.show">
                        <v-textarea :name="data.form.formName + '-comment'"
                                    :id="data.form.formName + '-comment'"
                                    :label="data.form.comment.text"
                                    v-model="request.comment"></v-textarea>
                    </div>

                    <div class="fw-form-check">
                        <v-checkbox v-if="data.form.confirm.show" :name="data.form.formName + '-confirm'" :id="data.form.formName + '-confirm'" :required="true" ref="confirm" v-model="request.confirm">Я согласен на <a href="/Grainatt_personal_data.pdf" target="_blank">обработку персональных данных</a></v-checkbox>
                    </div>

                    <div class="fw-form-submit" :class="{'fw-form-submit--trial': trial}">
                        <div class="fw-form-submit-row">
                            <div v-if="trial && $mq === 'desktop'" class="fw-form-submit-product">
                                <h-product-item :data="$config.trial"></h-product-item>
                                <input type="hidden" :name="data.form.formName + '-product'" :value="$config.trial.id">
                            </div>
                            <div class="fw-form-submit-btn" v-if="trial" onclick="yaCounter49078406.reachGoal('SUBM_TRIAL'); return true;">
                                <v-button :text="data.form.submit.name" :disable="!formValid" ref="submit" v-on:click.native="validate(true)" :progress="true" :startProgress="formSubmited"></v-button>
                            </div>
                            <div class="fw-form-submit-btn" v-else>
                                <v-button :text="data.form.submit.name" :disable="!formValid" ref="submit" v-on:click.native="validate(true)" :progress="true" :startProgress="formSubmited"></v-button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="fw-message" v-if="showMessage">
        <div class="fw-message-wr">
            <div class="fw-message-title pse-head" v-html="responseMessage.title"></div>
            <div class="fw-message-info" v-html="responseMessage.info"></div>
            <div class="fw-message-link">
                <v-button link='/' text="На главную" type="link"></v-button>
            </div>
        </div>
    </div>

    <mobile-footer></mobile-footer>
</div>
</template>

<script>
export default {
    props: {
        orders: null,
        trial: null,
        waste: null,
        promo: null,
        service: null,
        data: {
            type: Object,
            default: {
                text: {
                    head: {
                        title: '',
                        info: ''
                    },
                    message: {
                        success: {
                            title: '',
                            info: ''
                        },
                        error: {
                            title: '',
                            info: ''
                        }
                    }
                },
                form: {
                    formName: '',
                    name: {
                        show: true,
                        text: '',
                    },
                    lastName: {
                        show: false,
                        text: '',
                    },
                    phone: {
                        show: true,
                        text: '',
                    },
                    email: {
                        show: true,
                        text: '',
                    },
                    post: {
                        show: false,
                        text: '',
                    },
                    org: {
                        show: true,
                        text: '',
                    },
                    orgAddress: {
                        show: false,
                        text: ''
                    },
                    site: {
                        show: false,
                        text: ''
                    },
                    comment: {
                        show: false,
                        text: ''
                    },
                    confirm: {
                        show: true,
                    },
                    submit: {
                        name: 'Оформить'
                    },
                    api: ''
                }
            }
        }
    },
    data() {
        return {
            request: {
                name: '',
                email: '',
                phone: '',
                organization: '',
                orgAddress: '',
                lastName: '',
                post: '',
                site: '',
                comment: '',
                confirm: true,
            },
            responseMessage: {
                title: '',
                info: ''
            },
            formErrors: [],
            formValid: false,
            formSubmited: false,
            showMessage: false
        }
    },
    watch: {
        request: {
            handler: function(val, oldVal) {
                this.validate(false);
            },
            deep: true
        },
        $route(to, from) {
            this.$formModal.displayModal(false)
        }
    },
    methods: {
        validate(showErrors) {
            if (showErrors) {
                this.$validator.validateAll().then((result) => {
                    if (result && !this.formErrors.length) {
                        this.formValid = true
                        this.submitForm()
                        return;
                    } else {
                        this.formValid = false
                    }
                });
            } else {
                this.checkForm();
            }
        },
        checkForm() {
            let $this = this
            this.formErrors = []

            // Check name
            if (!this.request.name && this.data.form.name.show) {
                this.formErrors.push('name')
            }

            // Check email
            if (this.data.form.email.show) {
                if (!this.request.email) {
                    this.formErrors.push('email')
                } else {
                    this.$validator.validate(this.data.form.formName + '-email').then(result => {
                        if (!result) {
                            this.formErrors.push('email')
                        }
                    })
                }
            }

            // Check phone
            if (this.data.form.phone.show) {
                if (!this.request.phone) {
                    this.formErrors.push('phone')
                } else {
                    this.$validator.validate(this.data.form.formName + '-phone').then(result => {
                        if (!result) {
                            $this.formErrors.push('phone')
                        }
                    })
                }
            }

            // Check organization
            if (!this.request.organization && this.data.form.org.show) {
                this.formErrors.push('organization')
            }

            // Check last name
            if (!this.request.lastName && this.data.form.lastName.show) {
                this.formErrors.push('last-name')
            }

            // Check post
            if (!this.request.post && this.data.form.post.show) {
                this.formErrors.push('post')
            }

            // Check orgAddress
            if (!this.request.orgAddress && this.data.form.orgAddress.show) {
                this.formErrors.push('org-address')
            }

            // Check site
            if (!this.request.site && this.data.form.site.show) {
                this.formErrors.push('site')
            }

            // Check confirm
            if (!this.request.confirm && this.data.form.confirm.show) {
                this.formErrors.push('confirm')
            }

            setTimeout(() => {
                $this.formValid = $this.formErrors.length ? false : true;
            }, 100)
        },
        submitForm() {
            if (this.formSubmited) return

            let data = new FormData(this.$refs.form),
                $this = this;

            this.formDataToJSON(data);

            this.formSubmited = true;
            axios.post('/api/' + $this.data.form.api, data)
                .then(response => {
                    if (response.data.status === 'ok') {
                        $this.responseMessage.title = $this.data.text.message.success.title
                        $this.responseMessage.info = $this.data.text.message.success.info
                    } else {
                        $this.responseMessage.title = $this.data.text.message.error.title
                        $this.responseMessage.info = $this.data.text.message.error.info
                    }

                    $this.showMessage = true
                    $this.formSubmited = false

                    if (this.trial) {
                        this.$config.trial = null
                    }

                    if (this.waste) {
                        this.$config.wasteId = null
                    }

                    if (this.promo) {
                        this.$config.promoId = null
                    }

                    if (this.orders) {
                        LS.set('order', {
                            items: []
                        });
                        $this.$config.orderLength = 0
                    }
                })
                .catch(e => {
                    console.log('error', e);
                    $this.responseMessage.title = $this.data.text.message.error.title
                    $this.responseMessage.info = $this.data.text.message.error.info
                    $this.showMessage = true
                    $this.formSubmited = false
                })
        },
        formDataToJSON(data) {
            let result = {};

            for (var entry of data.entries())
            {
                result[entry[0]] = entry[1];
            }

            console.log(result);
        }
    }
}
</script>
