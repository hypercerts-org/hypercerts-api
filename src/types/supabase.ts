export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      allow_list_data: {
        Row: {
          data: Json | null
          id: string
          parsed: boolean | null
          root: string | null
          uri: string | null
        }
        Insert: {
          data?: Json | null
          id?: string
          parsed?: boolean | null
          root?: string | null
          uri?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          parsed?: boolean | null
          root?: string | null
          uri?: string | null
        }
        Relationships: []
      }
      attestations: {
        Row: {
          attestation: Json
          attestation_uid: string
          attester_address: string
          block_timestamp: number
          chain_id: number | null
          claims_id: string | null
          contract_address: string | null
          decoded_attestation: Json
          id: string
          recipient_address: string
          supported_schemas_id: string
          token_id: number | null
        }
        Insert: {
          attestation: Json
          attestation_uid: string
          attester_address: string
          block_timestamp: number
          chain_id?: number | null
          claims_id?: string | null
          contract_address?: string | null
          decoded_attestation: Json
          id?: string
          recipient_address: string
          supported_schemas_id: string
          token_id?: number | null
        }
        Update: {
          attestation?: Json
          attestation_uid?: string
          attester_address?: string
          block_timestamp?: number
          chain_id?: number | null
          claims_id?: string | null
          contract_address?: string | null
          decoded_attestation?: Json
          id?: string
          recipient_address?: string
          supported_schemas_id?: string
          token_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attestations_claims_id_fkey"
            columns: ["claims_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attestations_supported_schemas_id_fkey"
            columns: ["supported_schemas_id"]
            isOneToOne: false
            referencedRelation: "supported_schemas"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          contracts_id: string
          creation_block_timestamp: number | null
          hypercert_id: string | null
          id: string
          last_block_update_timestamp: number | null
          owner_address: string | null
          token_id: number
          units: number | null
          uri: string | null
          value: number | null
          claim_attestation_count: number | null
        }
        Insert: {
          contracts_id: string
          creation_block_timestamp?: number | null
          hypercert_id?: string | null
          id?: string
          last_block_update_timestamp?: number | null
          owner_address?: string | null
          token_id: number
          units?: number | null
          uri?: string | null
          value?: number | null
        }
        Update: {
          contracts_id?: string
          creation_block_timestamp?: number | null
          hypercert_id?: string | null
          id?: string
          last_block_update_timestamp?: number | null
          owner_address?: string | null
          token_id?: number
          units?: number | null
          uri?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_contracts_id_fkey"
            columns: ["contracts_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_uri_fkey"
            columns: ["uri"]
            isOneToOne: false
            referencedRelation: "metadata"
            referencedColumns: ["uri"]
          },
        ]
      }
      contract_events: {
        Row: {
          contracts_id: string
          events_id: string
          last_block_indexed: number | null
        }
        Insert: {
          contracts_id: string
          events_id: string
          last_block_indexed?: number | null
        }
        Update: {
          contracts_id?: string
          events_id?: string
          last_block_indexed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_events_contracts_id_fkey"
            columns: ["contracts_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_events_events_id_fkey"
            columns: ["events_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          chain_id: number
          contract_address: string
          id: string
          start_block: number | null
        }
        Insert: {
          chain_id: number
          contract_address: string
          id?: string
          start_block?: number | null
        }
        Update: {
          chain_id?: number
          contract_address?: string
          id?: string
          start_block?: number | null
        }
        Relationships: []
      }
      events: {
        Row: {
          abi: string
          id: string
          name: string
        }
        Insert: {
          abi: string
          id?: string
          name: string
        }
        Update: {
          abi?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      fractions: {
        Row: {
          claims_id: string
          creation_block_timestamp: number | null
          hypercert_id: string | null
          id: string
          last_block_update_timestamp: number | null
          owner_address: string | null
          token_id: number
          units: number | null
          value: number | null
        }
        Insert: {
          claims_id: string
          creation_block_timestamp?: number | null
          hypercert_id?: string | null
          id?: string
          last_block_update_timestamp?: number | null
          owner_address?: string | null
          token_id: number
          units?: number | null
          value?: number | null
        }
        Update: {
          claims_id?: string
          creation_block_timestamp?: number | null
          hypercert_id?: string | null
          id?: string
          last_block_update_timestamp?: number | null
          owner_address?: string | null
          token_id?: number
          units?: number | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fractions_claims_id_fkey"
            columns: ["claims_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      hypercert_allow_list_records: {
        Row: {
          entry: number
          hypercert_allow_lists_id: string
          id: string
          units: number
          user_address: string
        }
        Insert: {
          entry: number
          hypercert_allow_lists_id: string
          id?: string
          units: number
          user_address: string
        }
        Update: {
          entry?: number
          hypercert_allow_lists_id?: string
          id?: string
          units?: number
          user_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "hypercert_allow_list_records_hypercert_allow_lists_id_fkey"
            columns: ["hypercert_allow_lists_id"]
            isOneToOne: false
            referencedRelation: "hypercert_allow_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      hypercert_allow_lists: {
        Row: {
          allow_list_data_id: string | null
          claims_id: string
          id: string
          parsed: boolean | null
          root: string | null
        }
        Insert: {
          allow_list_data_id?: string | null
          claims_id: string
          id?: string
          parsed?: boolean | null
          root?: string | null
        }
        Update: {
          allow_list_data_id?: string | null
          claims_id?: string
          id?: string
          parsed?: boolean | null
          root?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hypercert_allow_lists_allow_list_data_id_fkey"
            columns: ["allow_list_data_id"]
            isOneToOne: false
            referencedRelation: "allow_list_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hypercert_allow_lists_claims_id_fkey"
            columns: ["claims_id"]
            isOneToOne: true
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      metadata: {
        Row: {
          allow_list_uri: string | null
          contributors: string[] | null
          description: string | null
          external_url: string | null
          id: string
          image: string | null
          impact_scope: string[] | null
          impact_timeframe_from: number | null
          impact_timeframe_to: number | null
          name: string | null
          parsed: boolean | null
          properties: Json | null
          rights: string[] | null
          uri: string | null
          work_scope: string[] | null
          work_timeframe_from: number | null
          work_timeframe_to: number | null
        }
        Insert: {
          allow_list_uri?: string | null
          contributors?: string[] | null
          description?: string | null
          external_url?: string | null
          id?: string
          image?: string | null
          impact_scope?: string[] | null
          impact_timeframe_from?: number | null
          impact_timeframe_to?: number | null
          name?: string | null
          parsed?: boolean | null
          properties?: Json | null
          rights?: string[] | null
          uri?: string | null
          work_scope?: string[] | null
          work_timeframe_from?: number | null
          work_timeframe_to?: number | null
        }
        Update: {
          allow_list_uri?: string | null
          contributors?: string[] | null
          description?: string | null
          external_url?: string | null
          id?: string
          image?: string | null
          impact_scope?: string[] | null
          impact_timeframe_from?: number | null
          impact_timeframe_to?: number | null
          name?: string | null
          parsed?: boolean | null
          properties?: Json | null
          rights?: string[] | null
          uri?: string | null
          work_scope?: string[] | null
          work_timeframe_from?: number | null
          work_timeframe_to?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "metadata_allow_list_uri_fkey"
            columns: ["allow_list_uri"]
            isOneToOne: false
            referencedRelation: "allow_list_data"
            referencedColumns: ["uri"]
          },
        ]
      }
      supported_schemas: {
        Row: {
          chain_id: number
          eas_schema_id: string
          id: string
          last_block_indexed: number | null
          resolver: string | null
          revocable: boolean | null
          schema: string | null
        }
        Insert: {
          chain_id: number
          eas_schema_id: string
          id?: string
          last_block_indexed?: number | null
          resolver?: string | null
          revocable?: boolean | null
          schema?: string | null
        }
        Update: {
          chain_id?: number
          eas_schema_id?: string
          id?: string
          last_block_indexed?: number | null
          resolver?: string | null
          revocable?: boolean | null
          schema?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_attestation_count: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      get_missing_metadata_uris: {
        Args: Record<PropertyKey, never>
        Returns: {
          missing_uri: string
        }[]
      }
      get_or_create_claim:
        | {
            Args: {
              p_chain_id: number
              p_contract_address: string
              p_token_id: number
            }
            Returns: string
          }
        | {
            Args: {
              p_contracts_id: string
              p_token_id: number
            }
            Returns: {
              contracts_id: string
              creation_block_timestamp: number | null
              hypercert_id: string | null
              id: string
              last_block_update_timestamp: number | null
              owner_address: string | null
              token_id: number
              units: number | null
              uri: string | null
              value: number | null
            }
          }
      get_unparsed_hypercert_allow_lists: {
        Args: Record<PropertyKey, never>
        Returns: {
          claim_id: string
          al_data_id: string
          data: Json
        }[]
      }
      store_allow_list_records: {
        Args: {
          _claims_id: string
          _allow_list_data_id: string
          _records: Json[]
        }
        Returns: undefined
      }
      store_fraction: {
        Args: {
          _fractions: Database["public"]["CompositeTypes"]["fraction_type"][]
        }
        Returns: undefined
      }
      store_hypercert_allow_list_roots: {
        Args: {
          p_hc_allow_list_roots: Database["public"]["CompositeTypes"]["hc_allow_list_root_type"][]
        }
        Returns: undefined
      }
      transfer_units_batch: {
        Args: {
          p_transfers: Database["public"]["CompositeTypes"]["transfer_units_type"][]
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      fraction_type: {
        claims_id: string | null
        token_id: number | null
        creation_block_timestamp: number | null
        last_block_update_timestamp: number | null
        owner_address: string | null
        value: number | null
      }
      hc_allow_list_root_type: {
        contract_id: string | null
        token_id: number | null
        root: string | null
      }
      transfer_units_type: {
        claim_id: string | null
        from_token_id: number | null
        to_token_id: number | null
        block_timestamp: number | null
        units_transferred: number | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
