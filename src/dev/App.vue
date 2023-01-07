<template>
  <PageLayout :sidebar-menu-list="sidebarMenuList">
    <router-view v-if="displayRouterView" />
    <Page
      v-else
      v-model:tab-id="selectedTab"
      title="Page Title"
      :header-buttons="headerButtons"
      :is-content-loading="false"
      :is-overlay-loading="false"
      :footer="{
        backHref: '/home',
        backLabel: 'Back to presets',
        submitLabel: 'Submit form',
        onSubmit: saySubmit,
        isSubmitting: false,
      }"
      :tabs="tabs"
    >
      <template #content>
        <h2>Active Tab: {{ selectedTab }}</h2>
        <br /><br />
        <div style="max-width: 400px">
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </div>
      </template>
      <!--            <template slot="footer">-->
      <!--                <h2>Footer</h2>-->
      <!--                <base-button></base-button>-->
      <!--            </template>-->
    </Page>
  </PageLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { TabType } from "@tager/admin-ui";

import { PageLayout } from "../components/PageLayout";
import Page from "../components/Page/Page.vue";

import { sidebarMenuList } from "./sidebar-menu-list";

export default defineComponent({
  components: { PageLayout, Page },
  setup() {
    function sayCow() {
      alert("Cooow");
    }

    function saySubmit() {
      alert("submit");
    }

    const tabs: Array<TabType> = [
      { id: "common", label: "Основное" },
      { id: "services", label: "Услуги" },
      { id: "workers", label: "Клинеры" },
      { id: "user", label: "Клиент" },
      { id: "map", label: "Карта" },
    ];
    const selectedTab = ref<string>(tabs[1].id);

    return {
      sidebarMenuList,
      headerButtons: [
        { variant: "secondary", text: "say cow2", onClick: sayCow },
        {
          variant: "secondary",
          text: "Create entity link",
          href: "http://ozitag.com",
        },
      ],
      displayRouterView: false,
      saySubmit,

      tabs,
      selectedTab,
    };
  },
});
</script>

<style scoped></style>
