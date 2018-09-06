package com.joomok0901;

import com.facebook.react.ReactActivity;
import  com.facebook.react.ReactInstanceManager ;

public class MainActivity extends ReactActivity {
    private ReactInstanceManager mReactInstanceManager;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override

    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    protected String getMainComponentName() {
        return "joomok0901";
    }
}
